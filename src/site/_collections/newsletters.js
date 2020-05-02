/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns an array of all past Newsletters.
 *
 * @param {object} collections 11ty collections object
 * @return {Array<{ data: { title: string, subhead: string, thumbnail: string, alt: string; }, year: string, month: string, day: string, date: Date, permalink: string, url: string, html: string }>}
 */
module.exports = (collections) => {
  return collections.getFilteredByTag('newsletter').reverse();
};
