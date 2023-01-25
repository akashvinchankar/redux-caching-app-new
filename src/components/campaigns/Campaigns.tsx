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
          // persistor.purge();
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
      <td
        style={{
          color: isFetching
            ? 'green'
            : isLoading
            ? 'blue'
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
