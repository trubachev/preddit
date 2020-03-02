import snarkdown from "snarkdown"

import { decodeHtml } from "./decode-html"

export const parseMd = mdText => snarkdown(decodeHtml(mdText))
