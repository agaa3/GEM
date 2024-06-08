import React from 'react';
import Link from 'next/link';

// Do aktualizacji po dodaniu produktow do Figmy

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Wyniki wyszukiwania:</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <Link href={result.url}>
              <a>{result.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
