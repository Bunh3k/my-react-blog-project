export default function Pagination({currentPage, totalPages, onPageChange}){

    const maxVisible = 5 

    let start = Math.max(currentPage - 2 ,1)
    let end = start + maxVisible - 1

    if(end > totalPages){
        end = totalPages;
        start = Math.max(end - maxVisible + 1, 1)
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return(
        <div className="pagination">
            <button
                className={
                    `pagination-link 
                    pagination-arrow 
                    ${currentPage === 1 ? 'is-disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ←
            </button>

            {start > 1 && (
                <>
                    <button
                        className="pagination-link"
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                    {start > 2 && <span className="pagination-dots">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    className={
                        `pagination-link 
                        ${currentPage === page ? 'is-active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="pagination-dots">...</span>}
                    <button
                        className="pagination-link"
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className={
                    `pagination-link
                    pagination-arrow
                    ${currentPage === totalPages ? 'is-disabled' : ''}
                    `}
                onClick={() => onPageChange(currentPage + 1)}
            >
                →
            </button>
        </div>
    )
}