"use client"

import { useState, useEffect } from "react"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Box, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export default function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts')
      if (res.ok) {
        const data = await res.json()
        setContacts(data)
      }
    } catch (error) {
      console.error("Failed to fetch contacts", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleDelete = async () => {
    if (!selectedContact) return
    try {
      const res = await fetch(`/api/admin/contacts?id=${selectedContact._id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchContacts()
        setOpenDelete(false)
        setSelectedContact(null)
      }
    } catch (error) {
      console.error("Failed to delete contact", error)
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'subject', headerName: 'Subject', flex: 1.5 },
    {
      field: 'createdAt',
      headerName: 'Date',
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
            onClick={() => {
              setSelectedContact(params.row)
              setOpenView(true)
            }}
            title="View Details"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              setSelectedContact(params.row)
              setOpenDelete(true)
            }}
            title="Delete Contact"
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
        Contact Management
      </Typography>
      <DataGrid
        rows={contacts}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />

      {/* View Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Details</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            <strong>From:</strong> {selectedContact?.name} ({selectedContact?.email})
          </DialogContentText>
          <DialogContentText sx={{ mb: 2 }}>
            <strong>Subject:</strong> {selectedContact?.subject}
          </DialogContentText>
          <DialogContentText sx={{ mb: 1 }}>
            <strong>Message:</strong>
          </DialogContentText>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
              {selectedContact?.message}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this inquiry from <strong>{selectedContact?.name}</strong>?
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
