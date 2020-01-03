"use strict"

const detectEmojiSupport = require("detect-emoji-support")

module.exports = async () => detectEmojiSupport() ? 3 : 0
