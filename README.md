# oc-grades
Sends everyone in O'Connell's Chemistry Honors class an email when O'Connell decides to update the gradebook.


If you want to subscribe to the mailing list, fill out [this Google form](http://goo.gl/forms/2Xbr87D9XC).

If you want to unsubscribe email either [gautam-AT-mittal-DOT-net](mailto:gautam@mittal.net) or [kevinfrans2-AT-gmail-DOT-come](kevinfrans2@gmail.com).

### Deployment
Before running ```node app.js```, you'll need to have a .env file in the project root with the following information:
```
MAILKEY=XXXXXSENDGRIDKEYXXXXXXXXX
DBHOST=https://sheetsu.com/apis/XXXXXX
SCRAPE_HOST=staff.pausd.org
SCRAPE_URL=http://staff.pausd.org/~coconnell/Grades/frame1.html
```
