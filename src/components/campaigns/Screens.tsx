import React, { useState } from 'react';
import { useFetchScreensQuery } from '../../features/campaign/screensSlice';
import moment from 'moment';
import { persistor } from '../../app/store';

export interface Screen {
  code: string;
  screen: string;
}

const Codes = ['ScreenCode1', 'ScreenCode2'];

const Screens = () => {
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleCheckboxChange = (id: string) => {
    if (selectedCodes.includes(id)) {
      setSelectedCodes(selectedCodes.filter((i) => i !== id));
    } else {
      setSelectedCodes([...selectedCodes, id]);
    }
  };
  // console.log(selectedCodes);

  const handleReload = () => {
    window.location.reload();
    persistor.purge();
  };

  return (
    <div>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Code</th>
            <th>Data</th>
            <th>Fulfilled Time Stamp</th>
            <th>Update Data</th>
          </tr>
        </thead>
        <tbody>
          {Codes.map((id) => (
            <ChildComponent
              key={id}
              id={id}
              handleCheckboxChange={handleCheckboxChange}
              selectedCodes={selectedCodes}
            />
          ))}
        </tbody>
      </table>

      {selectedCodes.length > 0 ? <p>{JSON.stringify(selectedCodes)}</p> : null}

      {message && <p>{message}</p>}

      <button
        onClick={() => {
          persistor.purge();
          setMessage('Storage has been purged');
        }}
      >
        Purge Storage
      </button>
      <button
        onClick={() => {
          setMessage('Page reloaded');
          handleReload();
        }}
      >
        Reload
      </button>
    </div>
  );
};

const ChildComponent = ({
  id,
  handleCheckboxChange,
  selectedCodes,
}: {
  id: string;
  handleCheckboxChange: (id: string) => void;
  selectedCodes: string[];
}) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
    fulfilledTimeStamp,
    refetch,
  } = useFetchScreensQuery(id);

  function handleRefetch() {
    // force re-fetches the data
    // window.location.reload();
    refetch();
  }

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={id}
          onChange={() => handleCheckboxChange(id)}
          checked={selectedCodes.includes(id)}
        />
      </td>
      <td>{id}</td>
      <td>
        {isLoading && <p>Loading</p>}
        {isFetching && <p>Fetching</p>}
        {error && <p>Something went wrong</p>}
        {isSuccess && JSON.stringify(data)}
      </td>
      <td>
        {isSuccess &&
          moment(fulfilledTimeStamp).format('MM/DD/YYYY, h:mm:ss a')}
      </td>
      <td>
        <button onClick={handleRefetch}>Refetch</button>
      </td>
    </tr>
  );
};

export default Screens;
