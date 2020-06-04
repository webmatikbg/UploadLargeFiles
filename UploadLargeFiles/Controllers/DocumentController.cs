using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using UploadLargeFiles.Models;

namespace UploadLargeFiles.Controllers
{
    public class DocumentController : Controller
    {
        [HttpPost]
        public async Task<ActionResult> UploadFile()
        {
            try
            {
                HttpPostedFileBase myFile = Request.Files["files[]"];

                if (myFile != null && myFile.ContentLength != 0)
                {
                    string uploadDirectory = Server.MapPath("~/Upload/");
                    if (!Directory.Exists(uploadDirectory))
                        Directory.CreateDirectory(uploadDirectory);

                    if (!Directory.Exists(uploadDirectory))
                        Directory.CreateDirectory(uploadDirectory);


                    int fileSizeInBytes = myFile.ContentLength;
                    string fileExtension = Path.GetExtension(myFile.FileName);
                    string filename = myFile.FileName;
                    string pathTosave = uploadDirectory + "\\" + filename;

                    bool fileAlreadySaved = System.IO.File.Exists(pathTosave);

                    if (fileAlreadySaved)
                    {
                        int count = 0;
                        string newFileName = "";
                        while (fileAlreadySaved)
                        {
                            count = count + 1;
                            newFileName = Path.GetFileNameWithoutExtension(myFile.FileName) + "-" + count + fileExtension;
                            fileAlreadySaved = System.IO.File.Exists(uploadDirectory + "\\" + newFileName);

                        }
                        pathTosave = uploadDirectory + "\\" + newFileName;
                        myFile.SaveAs(pathTosave);
                        filename = newFileName;
                    }
                    else
                        myFile.SaveAs(pathTosave);

                    return Json(new { files = new[] { new { name = myFile.FileName, size = myFile.ContentLength, url = pathTosave, thumbnailUrl = pathTosave, deleteUrl = "", deleteType = "DELETE" } } }, "text/html");
                }
                return Json(false);
            }
            catch (Exception ex)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Index()
        {
            DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/Upload/"));
            var files = di.GetFiles();
            List<IndexViewModel> list = new List<IndexViewModel>();
            foreach (FileInfo f in files)
            {
                IndexViewModel model = new IndexViewModel();
                model.FileName = f.Name;
                model.Extension = f.Extension;
                list.Add(model);
            }
            return View(list) ;
        }

        public FileResult openFile(String filename)
        {
            filename = Server.MapPath("~/Upload/" + filename);
            Stream fs = System.IO.File.OpenRead(filename);
            string mimeType = MimeMapping.GetMimeMapping(filename);
            return File(fs, mimeType, filename);
            
        }
    }
}