import React from 'react';
import { DayPicker } from 'react-day-picker';
import { faIR } from 'date-fns/locale';


function PersianDatePicker() {
  return (
    <DayPicker locale={faIR} />
  );
}

export default PersianDatePicker;
