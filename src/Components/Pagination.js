import React from 'react'

const Pagination = ({ NumberofPage, currentPage, setCurrentPage }) => {

    //Find the page Number
    const getPageNumbers = [...Array(NumberofPage + 1).keys()].slice(1)

    // Find Next Page
    const NextPage = () => {
        if (currentPage !== NumberofPage) setCurrentPage(currentPage + 1)
    }

    // Find Previous Page
    const PrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <p className="page-link" onClick={PrevPage}>Previous</p>
                </li>
                {getPageNumbers.map(pageNumber => (
                    <li key={pageNumber}
                        className={`page-item ${currentPage == pageNumber ? 'active' : ''} `} >
                        <p className="page-link" onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</p>
                    </li>
                ))}
                <li className="page-item"><p className="page-link" onClick={NextPage}>Next</p> </li>
            </ul>
        </nav>
    )
}

export default Pagination