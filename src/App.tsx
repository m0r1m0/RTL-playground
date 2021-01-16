import React, { ReactNode } from 'react';
import './App.css';

function getUser() {
  return Promise.resolve({
    id: '1',
    name: 'Robin'
  })
}

function App() {
  const [search, setSearch] = React.useState('');
  const [user, setUser] = React.useState<{id: string; name: string} | null>(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
 
    loadUser();
  }, []);
 
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
 
  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
 
      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}

interface SearchProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}
export function Search({ value, onChange, children }: SearchProps) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
 
export default App;
