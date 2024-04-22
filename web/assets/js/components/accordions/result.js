/**
 * Copyright 2024 Undistro Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const outputResultEl = document.getElementById("editor__output-result");

function createAccordionItemsByResults(result) {
  outputResultEl.style.display = "flex";

  Object.keys(result).forEach((key, i) => {
    const data = result[key];
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = "editor__output-result-accordion";
      listItem.setAttribute("data-open", "false");
      listItem.onclick = (e) => {
        const isAccordionOpen = listItem.getAttribute("data-open") === "true";
        if (isAccordionOpen) listItem.setAttribute("data-open", "false");
        else listItem.setAttribute("data-open", "true");
      };

      const accordionContent = document.createElement("div");
      accordionContent.className = "result-accordion-content";
      accordionContent.innerHTML = createErrorIcon(item, key, i);
      const costSpan = document.createElement("span");
      costSpan.innerHTML = `Cost: ${item.cost}`;
      accordionContent.appendChild(costSpan);

      const expansibleContent = document.createElement("div");
      expansibleContent.className = "result-accordion-expansible-content";
      expansibleContent.innerHTML = `<span>${item.result}</span>`;

      listItem.appendChild(accordionContent);
      listItem.appendChild(expansibleContent);

      outputResultEl.appendChild(listItem);
    });
  });
}

function createErrorIcon(item, key, i) {
  return `<div
            style="display: flex; align-items: center; gap: 0.5rem; position:relative"
          >
            <i class="ph ph-caret-right ph-bold result-arrow"></i>
            <div class="tooltip__container">
                    ${
                      item.isError
                        ? `<i class="ph ph-x-circle ph-fill" style="color: #e01e5a; z-index:999999" id="tooltip__trigger"></i>`
                        : ""
                    }
                    <div id="tooltip__content" class="tooltip" style="right:0; top:0">
                      <span class="tooltip__content--text">
                        Validation compilation failed.
                      </span>
                    </div>
                  </div>
                        
            <span>${key}[${i}]</span>
          </div>`;
}

export function renderAccordions(result) {
  outputResultEl.innerHTML = "";
  createAccordionItemsByResults(result);
}

export function hideAccordions() {
  outputResultEl.style.display = "none";
}
