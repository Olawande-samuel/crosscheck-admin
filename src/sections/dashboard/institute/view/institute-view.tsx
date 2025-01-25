import Api from '@/api';
import { Loader } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Iconify } from '@/components/iconify';
import { useQuery } from '@tanstack/react-query';
import { CountryDropdown } from 'react-country-region-selector';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';

import { emptyRows } from '../utils';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import AddInstituteModal from '../addInstituteModal';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';

// ----------------------------------------------------------------------

export function InstituteView() {
  const table = useTable();
  const [country, setCountry] = useState('');

  const [open, setOpen] = useState(false);

  const [filterName, setFilterName] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['get institutions', country, filterName],
    queryFn: () => Api.getInstitutions({ country, name: filterName }),
    enabled: !!country || !!filterName,
  });

  const dataFiltered: Institution[] = data?.data.institution.docs ?? [];
  
  // const dataFiltered: Institution[] = applyFilter({
  //   inputData: data?.data.institution.docs ?? [],
  //   comparator: getComparator(table.order, table.orderBy),
  //   filterName,
  // });

  const notFound = !dataFiltered.length && !!filterName;

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleEditDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Institute
        </Typography>
        <Button
          onClick={handleOpenDialog}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New
        </Button>
        <AddInstituteModal />
      </Box>
      <Card>
        <div className="my-4 flex justify-between gap-6 flex-wrap items-center ">
          <UserTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />
          <div className="flex flex-col px-6 md:basis-1/2">
            <span className="sr-only">Country</span>
            <CountryDropdown
              name="destination"
              id="destination"
              className="destination-country border py-4 rounded-lg px-4 border-[#e5e7eb]"
              valueType="full"
              value={country}
              onChange={(val) => {
                setCountry(val);
              }}
            />
          </div>
        </div>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            {isLoading ? (
              <div className="flex justify-center">
                <Loader className="animate-spin" />
              </div>
            ) : (
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={data?.data?.institution?.docs?.length ?? 0}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      (data?.data?.institution?.docs ?? [])?.map((user) => user._id)
                    )
                  }
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'country', label: 'Country' },
                    { id: 'institute_charge', label: 'Institute Charge' },
                    { id: 'our_charge', label: 'Our Charge' },
                    { id: 'transcript_fee', label: 'Transcript Fee' },
                    { id: 'status', label: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        key={row._id}
                        row={row}
                        selected={table.selected.includes(row._id)}
                        onSelectRow={() => table.onSelectRow(row._id)}
                        handleEditDialog={handleEditDialog}
                      />
                    ))}

                  <TableEmptyRows
                    height={48}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      (data?.data?.institution?.docs ?? [])?.length
                    )}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={(data?.data?.institution?.docs ?? [])?.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <AddInstituteModal open={open} onClose={handleCloseDialog} />
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
