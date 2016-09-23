import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { TextField } from 'ui/text-field';
import * as SocialShare from 'nativescript-social-share'

import { Grocery } from '../../shared/grocery/grocery';
import { GroceryListService } from '../../shared/grocery/grocery-list.service';

@Component({
  selector: 'list',
  templateUrl: 'pages/list/list.html',
  styleUrls: ['pages/list/list-common.css', 'pages/list/list.css'],
  providers: [GroceryListService]
})
export class ListComponent implements OnInit {
  groceryList: Array<Grocery> = [];
  grocery = '';
  isLoading = false;
  listLoaded = false;

  @ViewChild('groceryTextField') groceryTextField: ElementRef;

  constructor(private groceryListService: GroceryListService,
    private zone: NgZone) {}

  ngOnInit() {
    this.isLoading = true;
    this.groceryListService.load().
      subscribe(loadedGroceries => {
        loadedGroceries.forEach((groceryObject) => {
          this.groceryList.unshift(groceryObject);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
  }

  add() {
    if (this.grocery.trim() === '') {
      alert('Enter a grocery item');
      return;
    }

    // Dismiss the keyboard
    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this.groceryListService.add(this.grocery)
      .subscribe(
        groceryObject => {
          this.groceryList.unshift(groceryObject);
          this.grocery = '';
        },
        () => {
          alert({
            message: 'An error occurred while adding an item',
            okButtonText: 'OK'
          });
          this.grocery = '';
        }
      );
  }

  delete(grocery: Grocery) {
    this.groceryListService.delete(grocery.id)
      .subscribe(() => {
        this.zone.run(() => {
          var index = this.groceryList.indexOf(grocery);
          this.groceryList.splice(index, 1);
        });
      });
  }

  share() {
    let list = [];
    for (let i = 0, size = this.groceryList.length; i < size; i++) {
      list.push(this.groceryList[i].name);
    }
    let listString = list.join(',').trim();
    SocialShare.shareText(listString);
  }
}
