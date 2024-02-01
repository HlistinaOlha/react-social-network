import React, {useContext} from "react";
import styles from './Pagination.module.scss'
import {UsersContext} from "../../Users/UsersList/UsersContext";
import ReactPaginate from "react-paginate";
import classNames from 'classnames';

const Pagination = ({setPage}) => {

    const [_, __, currentPage, pageSize, totalUsersCount] = useContext(UsersContext)
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const handlePageClick = (page) => {
        setPage(page.selected + 1)
    }
    if (pagesCount) {
        return (
            <>
                <ReactPaginate
                    forcePage={currentPage > 0 ? currentPage - 1 : 0}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pagesCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName={styles.pagination}

                    pageClassName={styles.pageItem}
                    pageLinkClassName={styles.pageLink}

                    previousClassName={classNames(styles.pageItem, styles.prev)}
                    nextClassName={classNames(styles.pageItem, styles.next)}

                    previousLinkClassName={styles.pageLink}
                    nextLinkClassName={styles.pageLink}

                    disabledClassName={styles.disabled}
                    activeClassName={styles.active}

                    breakClassName={styles.breakItem}
                    breakLinkClassName={styles.breakLink}
                />
            </>
        )
    }

}

/*<div className={styles.pagination}>{
    pages.map(page => (
        <span key={page}
              className={page === currentPage ? `${styles.active} ${styles.page}` : `${styles.page}`}
              onClick={() => setPage(page)}
        >
            {page}
        </span>
    ))
    /!*[...Array(pagesCount)].map((page, idx) => (
        <span key={idx}
              className={idx + 1 === currentPage ? `${styles.active} ${styles.page}` : `${styles.page}`}
              onClick={() => setPage(idx + 1)}
        >
            {idx + 1}
        </span>
    ))*!/
}
</div>
)
}
*/
/*class Pagination extends Component {

    /!*    constructor(props) { //it is called just ONCE!!!! no need to write it if we do not pass any new props or data
            super(props);
        }*!/


    render() { // when anything changes - render() is called, not constructor()!!!
        return <div className={styles.pagination}>{
            [...Array(this.props.total)].map((page, idx) => (
                <span key={idx}
                      className={page === this.props.currentPage ? `${styles.active} ${styles.page}` : `${styles.page}`}>
                    {idx +1}
                </span>
            ))
        }
        </div>
    }
}*/

//const [pageOffset, setPageOffset] = useState(0);
//const endOffset = pageOffset + pageSize;
//const currentPages = pages.slice(pageOffset, endOffset);
//console.log(`Loading items from ${pageOffset} to ${endOffset}`);

/*handlePageClick = (page) => {
    const selectedPage = page.selected
    setPage(selectedPage)

    const newOffset = (page.selected * pageSize) % pages.length;
    console.log(
        `User requested page number ${page.selected}, which is offset ${newOffset}`
    );
    setPageOffset(newOffset);
};*/


export default Pagination
