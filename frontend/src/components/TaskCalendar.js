import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./TaskCalendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function TaskCalendar() {
	const [events, setEvents] = useState([
		{
			start: moment().startOf('day').toDate(),
			end: moment().endOf('day').toDate(),
			title: "Some title",
      allDay: true,
		},
	]);

	 const moveEvent = ({ event, start, end }) => {
			const idx = events.indexOf(event);

			const updatedEvent = { ...event, start, end, allDay: true };
			const nextEvents = [...events];
			nextEvents.splice(idx, 1, updatedEvent);

			setEvents(nextEvents);
			console.log(updatedEvent);
		};
    
	return (
		<div className="calendar">
			<DnDCalendar
				defaultDate={moment().toDate()}
				defaultView="month"
				events={events}
				localizer={localizer}
				onEventDrop={moveEvent}
				resizable={false}
			/>
		</div>
	);
}

export default TaskCalendar;
