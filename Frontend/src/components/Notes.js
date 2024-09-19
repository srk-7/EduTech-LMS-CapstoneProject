import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';

function Notes() {
    const [note, setNote] = useState("");

    // Load the note from local storage when the component mounts
    useEffect(() => {
        const savedNote = localStorage.getItem('studentNote');
        if (savedNote) {
            setNote(savedNote);
        }
    }, []);

    // Save the note to local storage whenever it changes
    const handleNoteChange = (e) => {
        setNote(e.target.value);
        localStorage.setItem('studentNote', e.target.value);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-10">
            <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faStickyNote} className="text-indigo-600 text-4xl mr-4" />
                <h2 className="text-2xl font-semibold text-indigo-600">My Notes</h2>
            </div>
            <textarea 
                value={note}
                onChange={handleNoteChange}
                className="w-full h-40 p-4 border border-gray-300 rounded-lg"
                placeholder="Type your notes here..."
            ></textarea>
        </div>
    );
}

export default Notes;
