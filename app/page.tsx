"use client";

import React, { useEffect, useState } from "react";

// import fontawesome (icon)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getData, setDeleteData, setUpdateStatus } from "./models/mahasiswa";

export default function MainPage() {
  //buat hook ("use state")
  //nilai awal tipe object
  const [getValue, setValue] = useState({});
  //buat fungsi untuk respon getData
  async function fetchData() {
    //isi nilai setValue
    setValue(await getData());
  }
  //buat hook ("use effect")
  useEffect(() => {
    //panggil fetshData
    fetchData();
  }, []);

  //buat fungsi hapus data
  async function setDelete(npm: string, nama: string) {
    // alert("Hapus"); menggunakan parameter if(confirm (${npm}) == true)
    if (confirm(`Data Mahasiswa : ${npm} - ${nama} \ningin Dihapus?`) == true) {
      // Untuk Update Data Status Mahasiswa
      await setUpdateStatus(npm);
      // Untuk Hapus Data Mahasiswa
      // await setDeleteData(npm);
      alert(`Data Mahasiswa : ${npm} - ${nama} \nBerhasil Dihapus`);
      // Reload Otomatis
      location.reload();
    }
    // else
    // {
    //   alert("Data Batal Dihapus");
    // }
  }

  return (
    <>
      <title>View Data Mahasiswa</title>
      {/* daisyui */}
      <nav className="mb-2.5 text-end">
        <Link href={"/add"}>
          <button className="btn btn-outline btn-info w-60">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            Tambah Data Mahasiswa
          </button>
        </Link>
      </nav>
      {/* <FontAwesomeIcon icon={faPen} size="1x"></FontAwesomeIcon> */}
      <div>
        {/* TAMPILKAN DATA MAHASISWA */}
        <table className="w-full">
          <thead>
            <tr className="bg-rose-600 h-30">
              <th className="w-10% border border-black">Aksi</th>
              <th className="w-10% border border-black">NPM</th>
              <th className="w-50% border border-black">Nama</th>
              <th className="w-30% border border-black">Prodi</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(getValue)?.map((data: any, index: number) => (
              <tr key={index}>
                <td className=" text-center border border-black px-2.5 py-1 text-xs">
                  <Link
                    href={`/edit/${btoa(data.npm)}`}
                    className="px-2 py-1 bg-green-400 text-white rounded-md mr-0.5"
                    title="Ubah Data"
                  >
                    <FontAwesomeIcon icon={faPen} size="1x"></FontAwesomeIcon>
                  </Link>
                  <Link
                    href={"/"}
                    className="px-2 py-1 bg-rose-600 text-white rounded-md ml-0.5"
                    title="Hapus"
                    // membuat set delete menarik data npm
                    onClick={() => {
                      setDelete(data.npm, data.nama);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} size="1x"></FontAwesomeIcon>
                  </Link>
                </td>
                <td className=" text-center border border-black">{data.npm}</td>
                <td className=" text-justify border border-black px-3">
                  {data.nama}
                </td>
                <td className=" text-center border border-black">
                  {data.prodi}
                </td>
              </tr>
            ))}
            {/* {mahasiswa?.npm} */}
          </tbody>
        </table>
      </div>
    </>
  );
}
