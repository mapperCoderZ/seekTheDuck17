import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { IActivity } from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';

@Component({
  moduleId: module.id,
  selector: 'cm-activity-edit',
  templateUrl: 'activity-edit.component.html',
  styleUrls: [ 'activity-edit.component.css' ]
})
export class ActivityEditComponent implements OnInit {

  activity: IActivity =
  {
    id: 0,
      name: '',
      description: '',
      picture: '',
    address: '',
    city: ''
  };
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  @ViewChild('activityForm') activityForm: NgForm;
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService,
              private growler: GrowlerService,
              private modalService: ModalService) { }

  ngOnInit() {
      //Subscribe to params so if it changes we pick it up. Don't technically need that here
      //since param won't be changing while component is alive. 
      //Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = +params['id'];
        if (id !== 0) {
          this.operationText = 'Update';
          this.getActivity(id);
        }
      });

  }

  getActivity(id: number) {
      this.dataService.getActivity(id).subscribe((activity: IActivity) => {
        this.activity = activity;
      });
  }

  submit() {
      if (this.activity.id === 0) {
        this.dataService.insertActivity(this.activity)
          .subscribe((insertedActivity: IActivity) => {
            if (insertedActivity) {
              //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
              this.activityForm.form.markAsPristine();
              this.router.navigate(['/activities']);
            } else {
              const msg = 'Unable to insert activity';
              this.growler.growl(msg, GrowlerMessageType.Danger);
              this.errorMessage = msg;
            }
          },
          (err: any) => console.log(err));
      } else {
        this.dataService.updateActivity(this.activity)
          .subscribe((status: boolean) => {
            if (status) {
              //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
              this.activityForm.form.markAsPristine();
              this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
              //this.router.navigate(['/activities']);
            }
            else {
              const msg = 'Unable to update activity';
              this.growler.growl(msg, GrowlerMessageType.Danger);
              this.errorMessage = msg;
            }
        },
        (err: any) => console.log(err));
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    //Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/activities']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteActivity(this.activity.id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/activities']);
          }
          else {
            this.errorMessage = 'Unable to delete activity';
          }
        },
        (err) => console.log(err));
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.activityForm.dirty) {
      return true;
    }

    //Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    }
    return this.modalService.show(modalContent);
  }

}