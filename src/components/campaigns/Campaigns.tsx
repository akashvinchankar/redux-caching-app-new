import React, { useState } from 'react';
import { useFetchCampaignsQuery } from '../../features/campaign/campaignsSlice';
import './Campaigns.css';
import moment from 'moment';

export interface Order {
  id: string;
  Order: string;
}

const IDs = ['Order1', 'Order2', 'Order3', 'Order4', 'Order5', 'Order6'];

const Campaigns = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // console.log(selectedIds);

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

      {/* <button
        onClick={() => {
          persistor.purge();
        }}
      >
        Purge Storage
      </button> */}
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
  } = useFetchCampaignsQuery(id);

  function handleRefetch() {
    // force re-fetches the data
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

export default Campaigns;