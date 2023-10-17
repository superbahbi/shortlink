/*
 *   Copyright (c) 2023 R3BL LLC
 *   All rights reserved.
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */
/// <reference types="webextension-polyfill-ts" />

import { Urls } from "./types"
import { browser } from "webextension-polyfill-ts"

export async function omniboxListener(shortlinkName: string) {
  const storage = await browser.storage.sync.get(shortlinkName)

  const urls: Urls = storage[shortlinkName]
  // Found shortlink, open all urls in new tabs.
  if (urls !== undefined && urls.length > 0) {
    openUrlsInTabs(urls)
  }
  // No shortlink found, do nothing.
  else {
    console.log(`Shortlink '${shortlinkName}' does not exist`)
    return
  }
}

export function openUrlsInTabs(urls: Urls) {
  if (urls === undefined || urls.length === 0) return

  for (const url of urls) {
    if (url === undefined) {
      continue
    }
    chrome.tabs.create({ url: url })
  }
}
