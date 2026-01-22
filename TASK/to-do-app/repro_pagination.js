
const testPagination = (totalPages, currentPage) => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    console.log(`Total: ${totalPages}, Current: ${currentPage} ->`, pages);
    return pages;
};

testPagination(6, 3);
testPagination(6, 2);
testPagination(6, 4);
testPagination(6, "3"); // Test string input
