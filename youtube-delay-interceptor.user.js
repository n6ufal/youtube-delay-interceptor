// ==UserScript==
// @name         YouTube Delay Interceptor
// @namespace    UserScripts
// @match        https://www.youtube.com/*
// @grant        none
// @version      1.1
// @author       Alif Naufal (n6ufal)
// @run-at       document-start
// ==/UserScript==

const textContentFactory = (() => {
  const out = { createScript: s => s };
  const { trustedTypes: tt } = self;
  if (tt instanceof Object && typeof tt.getPropertyType === "function") {
    if (tt.getPropertyType("script", "textContent") === "TrustedScript") {
      // Added a try/catch block because creating a duplicate policy name can throw errors
      try {
        return tt.createPolicy("userscript-cleaner", out);
      } catch (e) {
        return out;
      }
    }
  }
  return out;
})();

const handleMutations = mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeName === "SCRIPT" && node.textContent.includes('window,"fetch"')) {
        node.textContent = textContentFactory.createScript("");
      }
    }
  }
};

let observer = new MutationObserver(handleMutations);
observer.observe(document, {
  childList: true,
  subtree: true
});

document.addEventListener('DOMContentLoaded', () => {
  if (observer) {
    observer.disconnect();
    observer = null; // No longer crashes
  }
}, { once: true });
