const jwt = require('jsonwebtoken')
const { Profile } = require('../models/profileModel')
const bcrypt = require('bcrypt')
const db = require('../db/db')
const AuthController = require('./authController')
const { v4: uuidv4 } = require('uuid')
const {
    findEmailByUserId,
    findUserIdByEmail,
    updateBasicInfo,
    updatePhotos,
    updateUserCredentials,
} = require('../db/helpers/functions')

class ProfileController {
    static async getProfile(req, res) {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        const { email } = jwt.decode(token)
        const profile = await Profile.profileData(email)
        return res.status(200).json({ data: profile })
    }

    static async getProfileDetails(req, res) {
        const { id } = req.query
        const email = await findEmailByUserId(id)
        const token = req.header('Authorization')?.replace('Bearer ', '')
        const senderEmail = jwt.decode(token)
        const profile = await Profile.profileDetails(email, senderEmail.email)
        return res.status(200).json({ data: profile, shouldRedirect: false })
    }

    static async getSetupProfile(req, res) {
        const { username } = await Profile.profileData(req.email)
        const { genders, interests, relationships } =
            await Profile.getSetupData()

        return res.status(200).json({
            username: username,
            genders: genders.map((gender) => gender.name),
            interests: interests.map((interest) => interest.name),
            relationships: relationships.map(
                (relationship) => relationship.name
            ),
        })
    }

    static async setupProfile(req, res) {
        const data = req.body
        const error = await Profile.profileSetup(data, req.email)
        if (error.error) {
            return res.status(400).json({ message: error.error })
        }
        setTimeout(() => { 
            return res
            .status(200)
            .json({ shouldRedirect: true, redirectTo: '/accueil' })
        }, 2000);
    }

    static async getProfileInfos(req, res) {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        const { email } = jwt.decode(token)
        const profile = await Profile.profileDataCustumized(email)
        return res.status(200).json({ data: profile })
    }

    static async getListOfMatches(req, res) {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        const { email } = jwt.decode(token)
        const matches = await Profile.getListOfMatches(email)
        return res.status(200).json({ data: matches })
    }

    static async getListOfNotif(req, res) {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        const { email } = jwt.decode(token)
        const notfis = await Profile.getListOfNotifs(email)
        return res.status(200).json({ data: notfis })
    }

    static async createNotif(req, res) {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        const { email } = jwt.decode(token)
        const data = req.body
        const notif = await Profile.createNotif(data, email)
        return res.status(200).json({ data: notif })
    }

    static async setupData(req, res) {
        const { genders, interests, relationships } =
            await Profile.getSetupData()
        return res.status(200).json({
            genders: genders.map((gender) => gender.name),
            interests: interests.map((interest) => interest.name),
            relationships: relationships.map(
                (relationship) => relationship.name
            ),
        })
    }

    static async updateProfile(req, res) {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        const emailAddress = jwt.decode(token).email
        // const verificationToken = uuidv4().replace(/-/g, '')

        const userId = await findUserIdByEmail(emailAddress)
        const { data, images } = req.body

        await updatePhotos(userId, images)
        await updateBasicInfo(userId, {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            interests: data.interests,
            relation_type: data.relation_type,
            aboutme: data.aboutme,
            birthday: data.birthday,
            gender: data.gender,
        })
        const credentialsUpdates = await updateUserCredentials(
            userId,
            data.password,
        )
        if (
            credentialsUpdates.message
        ) {
            return res.status(200).json({ message: credentialsUpdates.message })
        }
        if (credentialsUpdates.passwordUpdated) {
            return res.status(201)
            .json({ shouldRedirect: true, redirectTo: '/auth/login' })
        }
    }
}

module.exports = ProfileController
