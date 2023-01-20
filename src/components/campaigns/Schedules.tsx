import React, { useState } from 'react';
import { useFetchSchedulesQuery } from '../../features/campaign/schedulesSlice';
import moment from 'moment';
import { persistor } from '../../app/store';

export interface Schedule {
  id: number;
  schedule: string;
}

const IDs = [1, 2];

const Schedules = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleCheckboxChange = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  // console.log(selectedIds);

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
            <th>ID</th>
            <th>Data</th>
            <th>Fulfilled Time Stamp</th>
            <th>Update Data</th>
          </tr>
        </thead>
        <tbody>
          {IDs.map((id) => (
            <ChildComponent
              key={id}
              id={id}
              handleCheckboxChange={handleCheckboxChange}
              selectedIds={selectedIds}
            />
          ))}
        </tbody>
      </table>

      {selectedIds.length > 0 ? <p>{JSON.stringify(selectedIds)}</p> : null}

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
  selectedIds,
}: {
  id: number;
  handleCheckboxChange: (id: number) => void;
  selectedIds: number[];
}) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
    fulfilledTimeStamp,
    refetch,
  } = useFetchSchedulesQuery(id);

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
          checked={selectedIds.includes(id)}
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

export default Schedules;
