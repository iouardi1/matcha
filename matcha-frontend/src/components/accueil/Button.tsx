import React from 'react'

const Button = ({ children, onClick, className, callbacks, name }: any) => (
    <button
        onClick={onClick}
        className={className}
        onMouseEnter={() => {
            if (name == 'like') callbacks.setHoverLike(true)
            else if (name == 'dislike') callbacks.setHoverDislike(true)
        }}
        onMouseLeave={() => {
            if (name == 'like') callbacks.setHoverLike(false)
            else if (name == 'dislike') callbacks.setHoverDislike(false)
        }}
    >
        {children}
    </button>
)

export default Button
