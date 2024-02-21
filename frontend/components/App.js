import React, { useState, useEffect } from 'react'

const initialValues = {
  fname: '',
  lname: '',
  bio: '',
}

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (editing !== null) {
      const editedMember = members.find(member => member.id === editing)
      setValues(editedMember)
    } else {
      setValues(initialValues)
    }
  }, [editing, members])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues(prevValues => ({ ...prevValues, [id]: value }))
  }
  const edit = id => {
    setEditing(id)
  }
  const submitNewMember = () => {
    const { fname, lname, bio } = values
    const newMember = { fname, lname, bio, id: getId() }
    setMembers(prevMembers => [...prevMembers, newMember])
    setValues(initialValues)
  }
  const editExistingMember = () => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === editing ? { ...values, id: editing } : member
      )
    )
    setValues(initialValues)
    setEditing(null)
  }

  const onSubmit = evt => {
    evt.preventDefault()

    if (!values.fname.trim() || !values.lname.trim() || !values.bio.trim()) {
      return;
    }

    if (editing === null) {
      submitNewMember()
    } else {
      editExistingMember()
    }
  }

  return (
    <div>
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {members.map(mem => (
            <div key={mem.id} className="member">
              <div>
                <h4>
                  {mem.fname} {mem.lname}
                </h4>
                <p>{mem.bio}</p>
              </div>
              <button onClick={() => edit(mem.id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input
              onChange={onChange}
              value={values.fname}
              id="fname"
              type="text"
              placeholder="Type First Name"
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input
              onChange={onChange}
              value={values.lname}
              id="lname"
              type="text"
              placeholder="Type Last Name"
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea
              onChange={onChange}
              value={values.bio}
              id="bio"
              placeholder="Type Bio"
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}