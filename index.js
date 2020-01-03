"use strict"

const hasFlag = require("has-flag")
const hasUnicode = require("has-unicode")
const getSystemFonts = require("get-system-fonts")
const path = require("path-extra")

const { env } = process

let forceLevel
if (hasFlag("no-emoji") ||
    hasFlag("no-emojis") ||
    hasFlag("emoji=false") ||
    hasFlag("emoji=never")) {
    forceLevel = 0
} else if (hasFlag("emoji") ||
    hasFlag("emojis") ||
    hasFlag("emoji=true") ||
    hasFlag("emoji=always")) {
    forceLevel = 1
}

if ("FORCE_EMOJI" in env) {
    if (env.FORCE_EMOJI === "true") {
        forceLevel = 1
    } else if (env.FORCE_EMOJI === "false") {
        forceLevel = 0
    } else {
        forceLevel = env.FORCE_EMOJI.length === 0 ? 1 : Math.min(parseInt(env.FORCE_EMOJI, 10), 3)
    }
}

module.exports = async () => {
    if (forceLevel) return forceLevel

    const fonts = (await getSystemFonts()).map(name => path.base(name))

    const fontLevels = {
        colour: ["NotoColorEmoji", "seguiemj", "OpenSansEmoji", "AndroidEmoji"],
        regular: ["NotoEmoji-Regular", "seguisym", "Symbola"]
    }

    if (fontLevels.colour.some(name => fonts.includes(name))) return 3
    if (fontLevels.regular.some(name => fonts.includes(name))) return 2

    return hasUnicode() ? 1 : 0
}
