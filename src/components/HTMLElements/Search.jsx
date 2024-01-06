import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    setSearchQuery, setListDoctorRedux,
    setSearchDoctorResult, setSearchUserResult,
    setListUserRedux, setListSpecialtyRedux,
    setSearchSpecialtyResult, setListClinicRedux,
    setSearchClinicResult,
    setListOverallRedux,
    setSearchQueryOverall
} from '../../store/features/search';
import { Link } from 'react-router-dom';
import { SEARCHCLINICS, SEARCHDOCTORS, SEARCHOVERALL, SEARCHSPECIALTIES, SEARCHUSERS } from '../../utils/constants';

const Search = (props) => {
    let { data, topic, category } = props
    const dispatch = useDispatch()
    useEffect(() => {
        if (props.category === SEARCHDOCTORS) {
            dispatch(setListDoctorRedux(data))
        }
        if (props.category === SEARCHUSERS) {
            dispatch(setListUserRedux(data))
        }
        if (props.category === SEARCHSPECIALTIES) {
            dispatch(setListSpecialtyRedux(data))
        }
        if (props.category === SEARCHCLINICS) {
            dispatch(setListClinicRedux(data))
        }
    }, [])
    useEffect(() => {
        if (props.category === SEARCHDOCTORS) {
            dispatch(setListDoctorRedux(data))
        }
        if (props.category === SEARCHUSERS) {
            dispatch(setListUserRedux(data))
        }
        if (props.category === SEARCHSPECIALTIES) {
            dispatch(setListSpecialtyRedux(data))
        }
        if (props.category === SEARCHCLINICS) {
            dispatch(setListClinicRedux(data))
        }
    }, [data])

    const [closeSearch, setCloseSearch] = useState(true)

    const queryRedux = useSelector(state => state.search.value.query)

    const resultsRedux = useSelector(state => state.search.value.results)
    const listItemsRedux = useSelector(state => state.search.value.listItems)

    const handleSearch = (e) => {
        const newQuery = e.target.value
        dispatch(setSearchQuery(newQuery))
        if (category === SEARCHDOCTORS) {
            dispatch(setSearchDoctorResult())
        }
        if (category === SEARCHUSERS) {
            dispatch(setSearchUserResult())
        }
        if (category === SEARCHSPECIALTIES) {
            dispatch(setSearchSpecialtyResult())
        }
        if (category === SEARCHCLINICS) {
            dispatch(setSearchClinicResult())
        }
        setCloseSearch(false)
    }

    useEffect(() => {
        dispatch(setSearchQuery(''))
    }, [window.location.href])

    const handleCloseSearchResult = () => {
        setCloseSearch(true)
        dispatch(setSearchQuery(''))
    }
    return (
        <div className="relative mt-8 mb-3 w-full">
            <div className="flex gap-4 items-center justify-center w-full">
                <input
                    onChange={handleSearch} value={queryRedux}
                    type="text" className='p-3 w-full rounded-xl  bg-gray-100 text-black '
                    placeholder='Search...' />
                {
                    !closeSearch &&
                    <div onClick={handleCloseSearchResult} className="flex justify-center items-center rounded-full bg-red-500 text-white hover:duration-200 hover:bg-red-300 cursor-pointer w-7 h-6">X</div>
                }
            </div>
            {!closeSearch &&
                <ul className={resultsRedux.length > 0 ? ' flex flex-col gap-5 justify-center items-center shadow-xl rounded-xl absolute w-full max-h-96 overflow-y-auto bg-white' : 'hidden'}>
                    {resultsRedux.length > 0 && resultsRedux.map((result, index) => {
                        return (topic === SEARCHDOCTORS ?
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
