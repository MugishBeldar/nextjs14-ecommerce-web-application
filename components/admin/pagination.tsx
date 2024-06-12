'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface PaginationComponentProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Pagination className="flex justify-end">
      <PaginationContent className="text-secondary-blue">
        <PaginationItem>
          <Button variant={"link"} disabled={currentPage === 1}>
            <PaginationPrevious
              className={cn(
                "",
                currentPage === 1
                  ? "cursor-not-allowed text-zinc-400 hover:text-zinc-400"
                  : "transition-all duration-500 hover:text-primary-txt text-secondary-blue hover:bg-secondary-blue"
              )}
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
            />
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className={cn(
                "hover:bg-secondary-blue hover:text-primary-txt border-none",
                currentPage === index + 1 ? "bg-secondary-blue text-white" : ""
              )}
              href="#"
              onClick={() => onPageChange(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button variant={"link"} disabled={currentPage === totalPages}>
            <PaginationNext
              className={cn(
                "",
                currentPage === totalPages
                  ? "cursor-not-allowed text-zinc-400 hover:text-zinc-400"
                  : "transition-all duration-500 hover:text-primary-txt text-secondary-blue hover:bg-secondary-blue"
              )}
              href="#"
              onClick={() => onPageChange(currentPage + 1)}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { PaginationComponent};
