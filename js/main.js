const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");
document.addEventListener('DOMContentLoaded', function() {
    // Find all links pointing to post IDs
    const menuLinks = document.querySelectorAll('a[href^="/#post-"]');
    
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target ID from the href
        const targetId = this.getAttribute('href').substring(2); // Remove the /# part
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const menuHeight = document.getElementById('menu').offsetHeight;
          const extraOffset = 50; // Additional space
          
          // Add a small delay to ensure page is fully rendered
          setTimeout(() => {
            // Get current scroll position
            const scrollY = window.scrollY;
            
            // Get target position
            const targetPosition = targetElement.getBoundingClientRect().top + scrollY;
            
            // Scroll with custom offset
            window.scrollTo({
              top: targetPosition - (menuHeight + extraOffset),
              behavior: 'smooth'
            });
          }, 100); // Small delay of 100ms
        }
      });
    });
    
    // Handle initial load with hash in URL
    if (window.location.hash && window.location.hash.includes('post-')) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Use a longer delay for initial page load
        setTimeout(() => {
          const menuHeight = document.getElementById('menu').offsetHeight;
          const extraOffset = 50;
          
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: targetPosition - (menuHeight + extraOffset),
            behavior: 'smooth'
          });
        }, 500); // Longer delay for initial page load
      }
    }
  });