// Sidebar open and close for mobile
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");

menuOpenBtn.addEventListener("click", function() {
  navLinks.style.left = "0";
});

menuCloseBtn.addEventListener("click", function() {
  navLinks.style.left = "-100%";
});

  // Lấy tất cả các phần tử li có chứa submenu
  const liElements = document.querySelectorAll('.navbar .links li');

  // Lặp qua các phần tử li và thêm sự kiện click cho mỗi li
  liElements.forEach((li) => {
    li.addEventListener('click', function () {
      // Kiểm tra xem có tồn tại submenu trong li này hay không
      const subMenu = this.querySelector('.sub-menu');
      
      // Kiểm tra xem submenu đang ẩn hay hiển thị
      const isSubMenuVisible = subMenu.style.display === 'block';
      
      // Đóng tất cả các submenu khác trước khi hiển thị submenu mới
      liElements.forEach((otherLi) => {
        const otherSubMenu = otherLi.querySelector('.sub-menu');
        if (otherSubMenu && otherSubMenu !== subMenu) {
          otherSubMenu.style.display = 'none';
        }
      });
      
      // Hiển thị hoặc đóng submenu hiện tại khi click vào một mục trong menu
      subMenu.style.display = isSubMenuVisible ? 'none' : 'block';
    });
  });


