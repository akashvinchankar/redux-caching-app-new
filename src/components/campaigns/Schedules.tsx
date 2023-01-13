import React from 'react';
import { useFetchSchedulesQuery } from '../../features/campaign/schedulesSlice';

export interface Schedule {
  id: number;
  schedule: string;
}

const Schedules = () => {
  const { data, error, isLoading, isFetching, isSuccess } =
    useFetchSchedulesQuery();

    function getSchedulesById(
      schedules: Schedule[] | null | undefined,
      id: number
    ): Schedule | undefined {
      return schedules?.find((schedule) => schedule.id === id);
    }

    let filteredSchedules = getSchedulesById(data, 2);

  return (
    <div>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          <h3>{JSON.stringify(filteredSchedules)}</h3>
        </div>
      )}
    </div>
  );
};

export default Schedules;
