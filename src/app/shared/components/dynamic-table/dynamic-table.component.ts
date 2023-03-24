import { DataSource } from '@angular/cdk/table';
import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatHeaderRowDef, MatRowDef, MatColumnDef, MatTable, MatFooterRowDef } from '@angular/material/table';

export interface PostsData {

  id: number; 
  product: string; 
  category: string; 
  sub_category: string;
  inventary: number;
  price: string;
  publication_date: string;
  status: boolean
}

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent<T> implements AfterContentInit {

  @Input() trackBy: any;
  @Input() data!: Observable<T[]>;
  @Input() displayedColumns: string[]  = [];
  @ViewChild(MatTable, { static: true })table!: MatTable<T>;

  @ContentChildren(MatHeaderRowDef)headerRowDefs!: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs!: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
  @ContentChildren(MatFooterRowDef) footerRowDefs!: QueryList<MatFooterRowDef>;

  dataSource!: DynamicDataSource<T>;

  @Output() selectEmitter = new EventEmitter();
  @Output() rowClick: EventEmitter<string> = new EventEmitter();

  res: any = [];

  constructor() {
  }

  ngAfterContentInit(): void {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    this.footerRowDefs.forEach(footerRowDef => this.table.addFooterRowDef(footerRowDef));
  }

  ngOnInit(): any {
    if (this.data) {
      const aux = this.data?.subscribe(res => {
        this.res = res;
        return res;
      });
      return aux;
    }
    return null;
  }
}

export class DynamicDataSource<T> extends DataSource<T> {
  data: BehaviorSubject<T[]>;

  constructor(initialData: T[] = []) {
    super();
    this.data = new BehaviorSubject<T[]>(initialData);
  }
  connect(): Observable<any[]> {
    return this.data;
  }
  disconnect(): void {
    this.data.complete();
  }
}
