import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useTranscriptStore from '@/store/transcriptStore';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  IconButton,
  TableFooter,
  CardContent,
  TableContainer,
  TablePagination,
} from '@mui/material';

const tableHeader = [
  {
    id: 1,
    label: 'Requester',
    align: 'left' as const,
  },
  {
    id: 2,
    label: 'Institution',
  },
  {
    id: 3,
    label: 'Date',
  },
];
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <BiSkipPrevious /> : <BiSkipNext />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <ArrowLeft /> : <ArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <ArrowLeft /> : <ArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <BiSkipPrevious /> : <BiSkipNext />}
      </IconButton>
    </Box>
  );
}

const OrderTable = ({ title, data }: { title: string; data: ITranscript[] }) => {
  const { setPreview, clearPreview } = useTranscriptStore();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => () => clearPreview(), [clearPreview]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (data?.length ?? 0)) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row: ITranscript) => {
    setPreview(row);
  };
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Card>
        <CardContent>
          <div className="text-[#707070]">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    {tableHeader?.map((item) => (
                      <TableCell align={item.align ?? 'right'}>{item.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : data
                  ).map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => handleRowClick(row)}
                      className="cursor-pointer"
                    >
                      <TableCell component="th" scope="row">
                        {String(row.requester)}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.institution.toString()}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.date.toString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={data?.length ?? 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTable;
