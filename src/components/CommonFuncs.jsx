import React from 'react'

export function Capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}