document.addEventListener('DOMContentLoaded', () => {
    const mbtiItems = document.querySelectorAll('.mbti-item');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const listItem = entry.target;
          const svgElement = listItem.querySelector('.mbti-svg');
          const progressCircle = listItem.querySelector('.mbti-progress');
  
          if (progressCircle && svgElement) {
            const percent = parseFloat(listItem.dataset.percent);
            const radius = parseFloat(progressCircle.getAttribute('r'));
            const circumference = 2 * Math.PI * radius;
            const offset = circumference * (1 - (percent / 100));
  
            // 1. Set up progress bar (stroke-dasharray/offset)
            progressCircle.style.strokeDasharray = circumference.toFixed(3);
            // Initially hide the bar for animation
            progressCircle.style.strokeDashoffset = circumference.toFixed(3);
  
            // 2. Animate when in view
            setTimeout(() => {
              progressCircle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
              progressCircle.style.strokeDashoffset = offset.toFixed(3);
            }, 100); // Small delay to ensure transition applies
  
            // 3. Add and style percentage text
            let percentText = svgElement.querySelector('.mbti-percent-text');
  
            // Ensure text element is inside SVG and has correct class
            if (!percentText) {
              percentText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              percentText.classList.add('mbti-percent-text');
              svgElement.appendChild(percentText);
            }
  
            percentText.setAttribute('x', '50%');
            percentText.setAttribute('y', '50%');
            percentText.setAttribute('dominant-baseline', 'middle');
            percentText.setAttribute('text-anchor', 'middle');
            percentText.setAttribute('fill', 'white');
            percentText.setAttribute('font-size', '18');
            percentText.setAttribute('text-rendering', 'optimizeLegibility');
            percentText.style.visibility = 'visible';
            percentText.style.opacity = '1';
            percentText.textContent = `${percent}%`;
          }
  
          observer.unobserve(listItem); // Stop observing once animated
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the item is visible
  
    mbtiItems.forEach(item => {
      observer.observe(item);
    });
  });
  
