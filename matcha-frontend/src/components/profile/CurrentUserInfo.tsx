import React from 'react'

export default function CurrentUserInfo({ user }: any) {
    return (
<>
    <div className="mx-4 mb-4 text-center">
        <h2 className="sm:text-2xl text-xl font-extrabold text-white mb-1 inline-block capitalize">
            {user.firstname}&nbsp;
        </h2>
        <h2 className="sm:text-2xl text-xl font-extrabold text-white mb-1 inline-block capitalize">
            {user.lastname}&nbsp;
        </h2>
        <p className="text-sm text-gray-400">@{user.username}</p>
    </div>

    {/* User Details */}
    <div className="rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-center text-white mb-6">
            Profile Information
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
                <p className="text-sm font-bold text-gray-400">About Me</p>
                <p className="text-base text-gray-200 leading-relaxed">
                    {user.aboutme || "No information provided."}
                </p>
            </div>

            <div>
                <p className="text-sm font-bold text-gray-400">Birthday</p>
                <p className="text-base text-gray-200 leading-relaxed">
                    {user.birthday
                        ? new Date(new Date(user.birthday).getTime() + 60 * 60 * 1000)
                              .toISOString()
                              .split("T")[0]
                        : "N/A"}
                </p>
            </div>

            <div>
                <p className="text-sm font-bold text-gray-400">Gender</p>
                <p className="text-base text-gray-200 leading-relaxed">
                    {user.gender || "N/A"}
                </p>
            </div>

            <div>
                <p className="text-sm font-bold text-gray-400">Email</p>
                <p className="text-base text-gray-200 leading-relaxed">
                    {user.email || "N/A"}
                </p>
            </div>
        </div>
    </div>
</>
    )
}
