import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import DataTable from "react-data-table-component";
import { RiApps2AddLine } from "react-icons/ri";
import Drawer from "@mui/material/Drawer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./post.css";
import DrawerList from "./DrawerList";
import { AppContext } from "../../context/ContextApp";
import Swal from "sweetalert2";

const PostPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { refreshData } = useContext(AppContext);
  const [drawerMode, setDrawerMode] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data: " + error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refreshData]);

  const handleAdd = () => {
    setCurrentId(null);
    setDrawerMode("add");
    setOpen(true);
  };

  const handleEdit = (id) => {
    setCurrentId(id);
    setDrawerMode("edit");
    setOpen(true);
  };

  const handleView = (id) => {
    setCurrentId(id);
    setDrawerMode("view");
    setOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            setIsLoading(false);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchData();
          })
          .catch((error) => {
            toast.error("Error deleting record: " + error.message);
            setIsLoading(false);
          });
      }
    });
  };

  const tableColumns = [
    {
      id: "sno",
      name: "SNo",
      cell: (row, index) => index + 1,
      width: "100px",
    },
    {
      id: "title",
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      id: "body",
      name: "Body",
      selector: (row) => row.body,
      sortable: true,
      width: "500px",
    },
    {
      id: "actions",
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="bg-blue-900 flex justify-center items-center p-2 rounded-md text-white text-xl"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-900 flex justify-center items-center p-2 rounded-md text-white text-xl"
          >
            <MdDelete />
          </button>
          <button
            onClick={() => handleView(row.id)}
            className="bg-yellow-600 flex justify-center items-center p-2 rounded-md text-white text-xl"
          >
            <HiMiniViewfinderCircle />
          </button>
        </div>
      ),
    },
  ];

  const handleCloseDrawer = () => {
    setOpen(false);
    setDrawerMode(null);
    setCurrentId(null);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="bg-blue-900 flex justify-end items-end mr-2 rounded-md h-[240px] w-full">
        <h1 className="text-3xl font-bold my-2 mr-4 mb-4">P O S T S</h1>
      </div>
      <Drawer anchor="right" open={open} onClose={handleCloseDrawer}>
        <DrawerList id={currentId} mode={drawerMode} onClose={handleCloseDrawer} />
      </Drawer>
      <div className="mt-7">
        {isLoading ? (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        ) : (
          <DataTable
            columns={tableColumns}
            data={data}
            pagination
            fixedHeader
            subHeader
            subHeaderComponent={
              <div className="w-full">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h1 className="text-2xl text-black">Post List</h1>
                  <button
                    onClick={handleAdd}
                    className="bg-slate-800 p-2 flex justify-center items-center gap-1 rounded-md hover:bg-slate-400 transition hover:text-black"
                  >
                    Add New <RiApps2AddLine />
                  </button>
                </div>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default PostPage;
