# JavaScript Files Documentation

## Active Files (Currently Used)

### main.js
- **Purpose**: Global functionality for all pages
- **Used in**: All HTML pages
- **Features**:
  - Smooth scroll for anchor links
  - Sticky header on scroll
  - Mobile menu toggle
  - Project filter
  - Blog filter
  - Blog modals
  - Skill bars animation (with GSAP)
- **Note**: Accordion code was removed to prevent conflicts with animations.js

### animations.js
- **Purpose**: Advanced GSAP animations for the main index page
- **Used in**: index.html, work/foto.html, work/template.html
- **Features**:
  - Hero parallax effects
  - **Accordion with smooth GSAP animations** (PRIMARY ACCORDION HANDLER)
  - Project filter with animations
  - Project cards animations
  - Parallax images
  - Blog filter
  - Blog modals
  - Skill bars
  - Carousel
  - Album covers animations

## Unused/Legacy Files

### about.js
- Similar to uhh.js
- Not currently referenced in any HTML file
- Contains MBTI progress circle animations

### blog.js
- Not currently referenced in any HTML file
- Blog functionality is now in main.js

### project-detail.js
- Not currently referenced in any HTML file
- Project detail functionality may be handled elsewhere

### uhh.js (36KB)
- Large file containing about page animations
- Not currently referenced in any HTML file
- Contains MBTI, work experience, and personality animations
- Appears to be a standalone version or backup
- **Fixed**: Removed duplicate basic accordion code (lines 614-636) to prevent conflicts with the GSAP accordion implementation (initAccordion function)

### oldmain.js
- Backup/old version of main.js
- Not referenced in any HTML file
- **Fixed**: Removed duplicate accordion code to match current main.js pattern
- Can be safely removed

### oldabout.js
- Backup/old version of about.js
- Not referenced in any HTML file
- Can be safely removed

## Important Notes

1. **Accordion Functionality**: Only animations.js should handle accordion functionality. Duplicate code has been removed from:
   - main.js (original fix)
   - uhh.js (adapted fix)
   - oldmain.js (adapted fix)
   
   All files now either use the GSAP-enhanced accordion or have comments explaining where the functionality is handled.

2. **GSAP Dependency**: animations.js requires GSAP and ScrollTrigger to be loaded before it.

3. **CSS Integration**: The accordion CSS in legacy.css has been updated to remove transitions that conflicted with GSAP animations.

4. **Load Order**: In index.html, scripts are loaded in this order:
   - GSAP libraries (in head)
   - main.js (at end of body)
   - animations.js (at end of body)

## Recommendations

1. Consider removing unused files (uhh.js, oldmain.js, oldabout.js) to reduce repository size
2. Consolidate functionality if possible to reduce code duplication
3. Add proper JSDoc comments to functions for better maintainability
