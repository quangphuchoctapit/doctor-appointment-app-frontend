import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setListDoctorRedux, setSearchQuery, setSearchResults } from '../../store/features/search';
import { Link } from 'react-router-dom';
import { DETAILDOCTOR } from '../../utils/constants';




const Search = (props) => {
    let { category, topic } = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setListDoctorRedux(category))
    }, [])
    useEffect(() => {
        dispatch(setListDoctorRedux(category))
    }, [category])

    const [closeDoctorSearch, setCloseDoctorSearch] = useState(false)

    const queryRedux = useSelector(state => state.search.value.query)
    const resultsRedux = useSelector(state => state.search.value.results)
    const listItemsRedux = useSelector(state => state.search.value.listItems.doctors)


    const handleSearch = (e) => {
        const newQuery = e.target.value
        dispatch(setSearchQuery(newQuery))
        dispatch(setSearchResults())
        setCloseDoctorSearch(false)
    }


    const handleCloseSearchDoctorResult = () => {
        setCloseDoctorSearch(true)
    }
    return (
        <div className="relative mt-8 mb-3 w-full">
            <div className="flex gap-4 items-center justify-center w-full">
                <input
                    onChange={handleSearch} value={queryRedux}
                    type="text" className='p-3 w-full rounded-xl  bg-gray-100 text-black '
                    placeholder='Search...' />
                {
                    !closeDoctorSearch &&
                    <div onClick={handleCloseSearchDoctorResult} className="flex justify-center items-center rounded-full bg-red-500 text-white hover:duration-200 hover:bg-red-300 cursor-pointer w-7 h-6">X</div>
                }
            </div>
            {!closeDoctorSearch &&
                <ul className={resultsRedux.length > 0 ? ' flex flex-col gap-5 justify-center items-center shadow-xl rounded-xl absolute w-full bg-white' : 'hidden'}>
                    {resultsRedux.length > 0 && resultsRedux.map((result, index) => {
                        return (topic === DETAILDOCTOR ?
                            <Link to={`/detail-doctor/${result.id}`} className='cursor-pointer p-3 w-full text-center hover:duration-200 hover:bg-gray-200' key={index}>
                                {result.name}
                            </Link> :
                            <li className='cursor-pointer p-3 w-full text-center hover:duration-200 hover:bg-gray-200' key={index}>
                                {result.name}
                            </li>)
                    })}
                </ul>
            }
        </div>
    )
}

export default Search
