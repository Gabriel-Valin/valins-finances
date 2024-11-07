"use client";

import { Stack, Button } from "@mui/material";
import { GridColDef, DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
} from "@refinedev/mui";
import React, { useState } from "react";

export default function BillingPageList() {
  const { dataGridProps } = useDataGrid();
  const { filterMode, filterModel, onFilterModelChange } = dataGridProps;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const handleSelectionChange = (selection: GridRowSelectionModel) => {
    setSelectedIds(selection.map((id) => id.toString()));
  };

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "name",
        headerName: "Nome",
        minWidth: 100,
      },
      {
        field: "description",
        flex: 1,
        headerName: "Descrição",
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <Stack direction="row" spacing={2} marginBottom={2}>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Adicionar Novo Item
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {}}
          disabled={selectedIds.length === 0}
        >
          Deletar Selecionados
        </Button>
      </Stack>
      <DataGrid
        columns={columns}
        {...dataGridProps}
        filterMode={filterMode}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectedIds}
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        autoHeight
      />
      <div style={{ marginTop: 16 }}>
        <strong>Selecionados:</strong> {selectedIds.join(", ")}
      </div>
    </List>
  );
}
