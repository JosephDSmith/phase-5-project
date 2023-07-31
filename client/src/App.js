import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./components/Authentication";
import NavBar from "./components/NavBar";
import ButterflyCollection from "./components/ButterflyCollection";
import ButterflyDetails from "./components/ButterflyDetails";
import ButterflyForm from "./components/ButterflyForm";
import PlantCollection from "./components/PlantCollection";
import PlantDetails from "./components/PlantDetails";
import PlantForm from "./components/PlantForm";
import AddToTheGarden from "./components/AddToTheGarden";
import EditingButterfly from "./components/EditingButterfly";
import "./index.css";
import Bottom from "./components/Bottom";

function App() {
  const [butterflies, setButterflies] = useState([]);
  const [plants, setPlants] = useState([]);
  const [user, setUser] = useState(null);
  const [butterfly_edit, setButterflyEdit] = useState(false);
  const updateUser = (user) => setUser(user);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchButterflies();
    fetchPlants();
  }, [user]);

  const fetchButterflies = () => {
    fetch("/api/butterflies")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Unauthorized");
        }
      })

      .then(setButterflies)
      .catch((error) => console.log(error.message));
  };

  //    try and except, try will run until and error is thrown, then it goes to the except
  //    same as the .then

  const fetchPlants = () => {
    fetch("/api/plants")
      .then((res) => res.json())
      .then(setPlants);
  };

  const fetchUser = () =>
    fetch("/api/authorized").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data);
          fetchButterflies();
          fetchPlants();
        });
      } else {
        setUser(null);
      }
    });

  const addButterfly = (b) => {
    setButterflies([...butterflies, b]);
    fetchButterflies();
  };

  const updateButterfly = (updated_butterfly) =>
    setButterflies((butterflies) =>
      butterflies.map((b) => {
        if (b.id === updated_butterfly.id) {
          return updated_butterfly;
        } else {
          return b;
        }
      })
    );

  const deleteButterfly = (deleted_butterfly) =>
    setButterflies((butterflies) =>
      butterflies.filter((b) => b.id !== deleted_butterfly.id)
    );

  const handleEdit = (butterfly) => {
    setButterflyEdit(butterfly);
    navigate(`butterflies/edit/${butterfly.id}`);
  };

  const addPlant = (p) => {
    setPlants([...plants, p]);
    fetchPlants();
  };

  if (!user)
    return (
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home fetchUser={fetchUser} />} />
          <Route
            path="/authentication"
            element={<Authentication updateUser={updateUser} />}
          />
        </Routes>
      </>
    );

  return (
    <>
      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={<Home username={user.username} fetchUser={fetchUser} />}
        />
        <Route
          path="/authentication"
          element={<Authentication updateUser={updateUser} />}
        />
        <Route
          exact
          path="/butterflies"
          element={
            <ButterflyCollection
              butterflies={butterflies}
              user={user}
              fetchButterflies={fetchButterflies}
            />
          }
        />
        <Route
          path="/butterflies/:id"
          element={
            <ButterflyDetails
              user={user}
              handleEdit={handleEdit}
              deleteButterfly={deleteButterfly}
              fetchButterflies={fetchButterflies}
            />
          }
        />
        <Route
          path="/butterflies/edit/:id"
          element={
            <EditingButterfly
              butterfly_edit={butterfly_edit}
              updateButterfly={updateButterfly}
            />
          }
        />
        /
        <Route path="/butterflies/new" element={<ButterflyForm />} />
        <Route
          path="/plants"
          element={<PlantCollection plants={plants} user={user} />}
        />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route path="/plants/new" elemenbt={<PlantForm />} />
        <Route
          path="/addtothegarden"
          element={
            <AddToTheGarden addButterfly={addButterfly} addPlant={addPlant} />
          }
        />
      </Routes>
      <Bottom />
    </>
  );
}
export default App;
