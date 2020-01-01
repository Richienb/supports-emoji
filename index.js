"use strict"

const hasFlag = require("has-flag")
const platform = require("os").platform()
const execa = require("execa")

const { env } = process

module.exports = () => {
    if (hasFlag("no-emoji") ||
        hasFlag("no-emojis") ||
        hasFlag("emoji=false") ||
        hasFlag("emoji=never")) {
        return 0
    } else if (hasFlag("emoji") ||
        hasFlag("emojis") ||
        hasFlag("emoji=true") ||
        hasFlag("emoji=always")) {
        return 1
    }

    if ("FORCE_EMOJI" in env) {
        if (env.FORCE_EMOJI === "true") {
            return 1
        } else if (env.FORCE_EMOJI === "false") {
            return 0
        } else {
            return env.FORCE_EMOJI.length === 0 ? 1 : Math.min(parseInt(env.FORCE_EMOJI, 10), 3)
        }
    }

    if (platform === "win32") {
        if ("PsModulePath" in env) return 0
        if ("ComSpec" in env && env.ComSpec.includes("cmd.exe")) return 2
        return 0
    } else if (platform === "darwin") {

    } else if (platform === "linux") {
        const val = execa.commandSync("echo \\u00E0\\u00A5\\u00A5 | wc -m")
        console.log(val)
    }
}
