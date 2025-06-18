function extractPageInfo() {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.content || '';
    const readingTime = estimateReadingTime();
    return {
      title,
      description,
      readingTime,
      wordCount: document.body.innerText.split(' ').length
    };
  }
  
  function estimateReadingTime() {
    const text = document.body.innerText;
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  }
  
  // Send page info to background script when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendPageInfo);
  } else {
    sendPageInfo();
  }
  
  function sendPageInfo() {
    const pageInfo = extractPageInfo();
    chrome.runtime.sendMessage({
      type: 'PAGE_INFO',
       pageInfo
    });
  }
  
