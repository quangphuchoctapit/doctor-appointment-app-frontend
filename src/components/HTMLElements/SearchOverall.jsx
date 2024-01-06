import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    setSearchQueryOverall, setListOverallRedux, setSearchOverallResult
} from '../../store/features/search';
import { Link } from 'react-router-dom';
import { SEARCHOVERALL } from '../../utils/constants';

const SearchOverall = (props) => {
    let { data, topic, category } = props
    const dispatch = useDispatch()
    useEffect(() => {
        if (props.category === SEARCHOVERALL) {
            dispatch(setListOverallRedux(data))
        }
        setCloseSearch(false)
    }, [])
    useEffect(() => {
        if (props.category === SEARCHOVERALL) {
            dispatch(setListOverallRedux(data))
        }
    }, [data])

    const [closeSearch, setCloseSearch] = useState(true)

    const queryRedux = useSelector(state => state.search.value.queryOverall)
    const resultsRedux = useSelector(state => state.search.value.resultOverall)
    const listItemsRedux = useSelector(state => state.search.value.overallSearch)

    const handleSearch = (e) => {
        const newQuery = e.target.value
        dispatch(setSearchQueryOverall(newQuery))
        if (category === SEARCHOVERALL) {
            dispatch(setSearchOverallResult())
            setCloseSearch(false)
        }
    }

    useEffect(() => {
        dispatch(setSearchQueryOverall(''))
        setCloseSearch(true)
    }, [window.location.href])

    const handleCloseSearchResult = () => {
        setCloseSearch(true)
        dispatch(setSearchQueryOverall(''))
    }

    return (
        <div className="relative w-full">
            <div className="flex gap-4 items-center justify-center w-full">
                <input
                    onChange={handleSearch} value={queryRedux}
                    type="text" className='p-3 w-full rounded-xl  bg-gray-100 text-black '
                    placeholder='SearchOverall...' />
                {
                    !closeSearch &&
                    <div onClick={handleCloseSearchResult} className="flex justify-center items-center rounded-full bg-red-500 text-white hover:duration-200 hover:bg-red-300 cursor-pointer w-7 h-6">X</div>

                }

            </div>
            <ul className={!closeSearch ? ' flex flex-col gap-5 justify-center items-center shadow-xl rounded-xl absolute w-full max-h-96 overflow-y-auto bg-white' : 'hidden'}>
                {resultsRedux.length > 0 && resultsRedux.map((result, index) => {
                    return (
                        <li className='cursor-pointer p-3 w-full text-center hover:duration-200 hover:bg-gray-200 ' key={index}>
                            {result.name}
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default SearchOverall
