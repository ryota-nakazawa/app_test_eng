"use client"

import { useState, useEffect } from "react"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Box, Typography, Button, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Failed to fetch users", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRoleUpdate = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      })
      if (res.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error("Failed to update role", error)
    }
  }

  const handleDelete = async () => {
    if (!selectedUser) return
    try {
      const res = await fetch(`/api/admin/users?id=${selectedUser._id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchUsers()
        setOpenDelete(false)
        setSelectedUser(null)
      }
    } catch (error) {
      console.error("Failed to delete user", error)
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={params.value === 'admin' ? 'primary' : 'default'}
          size="small"
        />
      )
    },
    {
      field: 'createdAt',
      headerName: 'Joined',
      width: 180,
      valueFormatter: (value: unknown) => new Date(value as string).toLocaleDateString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleRoleUpdate(params.row._id, params.row.role)}
            title="Toggle Role"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              setSelectedUser(params.row)
              setOpenDelete(true)
            }}
            title="Delete User"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        User Management
      </Typography>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete user <strong>{selectedUser?.name}</strong>?
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
