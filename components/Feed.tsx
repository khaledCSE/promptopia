'use client'

import { useState } from "react"
import PromptCardList from "@components/PromptCardList"

const Feed = () => {
  const [searchText, setSearchText] = useState('')

  const handleTagClick = () => { }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          className="search_input peer"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      <PromptCardList handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed
