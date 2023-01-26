import React, { useEffect, useState } from 'react';
import { useFetchCampaignsQuery } from '../../features/campaign/campaignsSlice';
import './Campaigns.css';
import moment from 'moment';
import { persistor } from '../../app/store';

export interface Order {
  id: string;
  Order: string;
}

const IDs = ['Order1', 'Order2', 'Order3', 'Order4', 'Order5', 'Order6'];

const Campaigns = () => {
  // get the selected IDs from local storage on page load
  const storedSelectedIds = localStorage.getItem('selectedIds');
  const initialSelectedIds = storedSelectedIds
    ? JSON.parse(storedSelectedIds)
    : [];
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);

  const [message, setMessage] = useState<string>('');

  // save the selected IDs to local storage every time they change
  useEffect(() => {
    localStorage.setItem('selectedIds', JSON.stringify(selectedIds));
  }, [selectedIds]);

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th style={{ width: '300px' }}>Description</th>
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
          localStorage.clear();
          setMessage('Storage has been purged');
        }}
      >
        Purge Storage
      </button>
      <button
        onClick={() => {
          persistor.purge();
          window.location.reload();
        }}
      >
        Reload and Clear Cache
      </button>
      <button
        onClick={() => {
          setSelectedIds([]);
          localStorage.removeItem('selectedIds');
        }}
      >
        Clear Checkboxes
      </button>
      <p style={{ color: 'red' }}>
        Clear checkboxes and Reload to get fresh data in the UI
      </p>
    </div>
  );
};

const ChildComponent = ({
  id,
  handleCheckboxChange,
  selectedIds,
}: {
  id: string;
  handleCheckboxChange: (id: string) => void;
  selectedIds: string[];
}) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
    fulfilledTimeStamp,
    refetch,
  } = useFetchCampaignsQuery(selectedIds.includes(id) ? id : null);

  function handleRefetch() {
    refetch();
  }

  const [isDataFromLocalStorage, setIsDataFromLocalStorage] = useState(false);
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem('persist:root');
    if (dataFromLocalStorage) {
      setIsDataFromLocalStorage(true);
    } else {
      setIsDataFromLocalStorage(false);
    }
  }, [id, isSuccess]);

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
      {/* as response time of server is 3secs, if the data we are getting is from api till the time we get data fetching message will be shown in green color */}
      {/* if the data is from cache it will be loading from cache and it will be in cyan */}
      {/* as we are persisting the whole app all the api response and data will be stored in local storage app will check for local data and it will change its color to blue */}
      <td
        style={{
          color: isFetching
            ? 'green'
            : isLoading
            ? 'cyan'
            : isDataFromLocalStorage
            ? 'blue'
            : 'red',
        }}
      >
        {/* {isFetching && <p>Fetching</p>} */}
        {isLoading && <p>Loading</p>}
        {error && <p>Something went wrong</p>}
        {isSuccess && selectedIds.includes(id) && JSON.stringify(data)}
      </td>
      <td>
        {isSuccess &&
          selectedIds.includes(id) &&
          moment(fulfilledTimeStamp).format('MM/DD/YYYY, h:mm:ss a')}
      </td>
      <td>
        {selectedIds.includes(id) && (
          <button onClick={handleRefetch}>Refetch</button>
        )}
      </td>
    </tr>
  );
};

export default Campaigns;
