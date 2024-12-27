"use client";

import Link from "next/link";
import React, { useState } from "react";
import { checkData, setSaveData } from "../models/mahasiswa";

export default function AddPage() {
  // buat hook "use state" untuk membaca nilai input
  const [getNPM, setNPM] = useState("");
  const [getNama, setNama] = useState("");
  const [getProdi, setProdi] = useState("");
  const [getCheck, setCheck] = useState({});

  // buat fungsi untuk ambil data dari fungsi "checkData"
  const getCheckData = async(npm: string) => {
    setCheck(await checkData(npm));
  }

  // buat fungsi untuk simpan data
  const saveData = async() => {
    // alert(getNPM);

    // setCheck(await checkData(getNPM));

    // ternary operator
    getNPM == "" || getNama == "" || getProdi == ""
      ? [alert("Data Harus Lengkap")]
      : [
        (Object.values(getCheck)?.length == 0)
        ? [
          await setSaveData(getNPM, getNama, getProdi), alert("Data Berhasil Disimpan"), location.reload
        ]
        : alert("NPM Sudah Terdaftar !")

        ];
    // alert(status[0]); harus menggunakan const status =
  };

  return (
    <div>
      <title>Tambah Data Mahasiswa</title>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className=" col-span-1">
          <label htmlFor="">NPM</label>
        </div>
        <div className="col-span-3">
          <input
            type="text"
            placeholder="Isi NPM"
            maxLength={8}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            className="input input-bordered input-success w-full"
            onChange={(e) => {
              setNPM(e.target.value);
              getCheckData(e.target.value);
            }}
          />
        </div>
        <div className="col-start-1">
          <label htmlFor="">Nama</label>
        </div>
        <div className="col-span-3">
          <input
            type="text"
            placeholder="Isi Nama Mahasiswa"
            maxLength={100}
            onKeyPress={(e) => {
              if (!/[a-zA-Z\s]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            className="input input-bordered input-success w-full"
            onChange={(e) => {
              setNama(e.target.value);
            }}
          />
        </div>
        <div className="col-start-1">
          <label htmlFor="">Program Studi</label>
        </div>
        <div className="col-span-3">
          <select
            defaultValue={""}
            className="select select-success w-full"
            onChange={(e) => {
              setProdi(e.target.value);
            }}
          >
            <option value={""} disabled >
              Pilih Program Studi
            </option>
            <option value={"Informatika"}>Informatika</option>
            <option value={"Sistem Informasi"}>Sistem Informasi</option>
            <option value={"Teknologi Informasi"}>Teknologi Informasi</option>
            <option value={"Teknik Komputer"}>Teknik Komputer</option>
            <option value={"Teknik Elektro"}>Teknik Elektro</option>
            <option value={"Teknik Sipil"}>Teknik Sipil</option>
          </select>
        </div>
        <div className="col-start-2 col-span-3">
          <button
            className="btn btn-active btn-accent mr-5 w-36"
            onClick={saveData}
          >
            Simpan
          </button>
          <Link href={"/"} className="btn btn-error ml-5 w-36">
            Batal
          </Link>
        </div>
      </div>
    </div>
  );
}
