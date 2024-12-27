"use server";
import { PrismaClient } from "@prisma/client";

// BUAT VARIABEL "PRISMA"
const prisma = new PrismaClient();

// Buat Fungsi Untuk Tampilkan Data Mahasiswa
export async function getData() {
  // Ambil Data Mahasiswa Dari Database
  // BUAT VARIABEL UNTUK TAMPILKAN DATA MAHASISWA
  // Server Component
  const mahasiswa = await prisma.tb_mahasiswa.findMany({
    where: {
      status: "Y",
      // prodi : {
      //   contains: "Sistem",
      // }
    },
  });

  return mahasiswa;
}

// buat fungsi (arrow function) untuk hapus data / update data
// export async function setDelete()
export const setUpdateStatus = async (npm: string) => {
  // Ambil Data Mahasiswa Dari Database
  // BUAT VARIABEL UNTUK UBAH STATUS DATA MAHASISWA (Dari Y > T)
  // Server Component
  await prisma.tb_mahasiswa.updateMany({
    where: {
      npm: npm,
    },
    data: {
      status: "T",
    },
  });
};

export const setDeleteData = async (npm: string) => {
  // Buat Variabel untuk Hapus Data Mahasiswa
  await prisma.tb_mahasiswa.deleteMany( {
    where: {
      npm: npm,
    },
  });
}

// buat fungsi untuk check data mahasiswa (npm)
export const checkData = async(npm: string) => {
  // Ambil Data Mahasiswa Dari Database
  // BUAT VARIABEL UNTUK CHECK DATA MAHASISWA BERDASARKAN NPM
  // Server Component
  const check = await prisma.tb_mahasiswa.findMany({
    select: {
      id: true,
    },
    where: {
      npm: npm,
    },
  });

  return check; 
}

export const setSaveData = async(npm: string, nama: string, prodi: string) => {
  await prisma.tb_mahasiswa.create({
    data: {
      npm: npm,
      nama: nama,
      prodi: prodi,
      status: 'Y',
    },
  })
}

// buat fungsi untuk tampil detail data mahasiswa (npm)
export const detailData = async(npm: string) => {
  // Ambil Data Mahasiswa Dari Database
  // BUAT VARIABEL UNTUK CHECK DATA MAHASISWA BERDASARKAN NPM
  // Server Component
  const detail = await prisma.tb_mahasiswa.findMany({
    where: {
      npm: npm,
    },
  });
  return detail;
}