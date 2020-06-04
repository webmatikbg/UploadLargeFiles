using System.Web;
using System.Web.Optimization;

namespace UploadLargeFiles
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //———————————————————–
            // BUNDLE METRONIC 5.2
            //———————————————————–
            bundles.Add(new StyleBundle("~/bundles/metronic_V5_2_default_Style")
            //BEGIN Base Styles
            .Include("~/assets/vendors/base/vendors.bundle.css", new CssRewriteUrlTransformWrapper())
            .Include("~/assets/demo/default/base/style.bundle.css", new CssRewriteUrlTransformWrapper())
            );
            bundles.Add(new ScriptBundle("~/bundles/metronic_V5_2_default_Script_vendors")
            //BEGIN Base Scripts
            .Include("~/assets/vendors/base/vendors.bundle.js")
            );
            bundles.Add(new ScriptBundle("~/bundles/metronic_V5_2_Script")
            //BEGIN Base Scripts
            .Include("~/assets/demo/default/base/scripts.bundle.js", new CssRewriteUrlTransformWrapper())
            //BEGIN Page Snippets
            .Include("~/assets/app/js/dashboard.js", new CssRewriteUrlTransformWrapper())
            );
            BundleTable.EnableOptimizations = false;   //da cambiare in produzione

            //———————————————————–
            // BUNDLE WEBMATIK STYLES
            //———————————————————–

            bundles.Add(new StyleBundle("~/styleBundle/WebMatikStyles").Include(
                  //"~/Content/plugins/select2/select2.min.css",
                  "~/Content/plugins/iCheck/skins/all.css",
                  "~/Content/plugins/dataTables/datatables.min.css",
                  "~/Content/plugins/jquery-confirm/jquery-confirm.min.css",
                  "~/Content/plugins/sweetalert/sweetalert.css"
                  ));

            //———————————————————–
            // BUNDLE WEBMATIK SCRIPTS
            //———————————————————–

            bundles.Add(new ScriptBundle("~/scriptBundle/WebMatikScripts").Include(
                        //"~/Scripts/plugins/select2/select2.full.min.js",
                        "~/Scripts/plugins/iCheck/icheck.min.js",
                        "~/Content/plugins/dataTables/datatables.min.js",
                        "~/Content/plugins/dataTables/sum().js",
                        "~/Scripts/plugins/blockui/jquery.blockUI.js",
                        "~/Scripts/plugins/jquery-confirm/jquery-confirm.min.js",
                        "~/Scripts/plugins/sweetalert/sweetalert.min.js"
                        ));


            //———————————————————–
            // BUNDLE PLUGINS
            //———————————————————–

            // switchery styles
            bundles.Add(new StyleBundle("~/plugins/switcheryStyles").Include(
                      "~/Content/plugins/switchery/switchery.css"));

            // switchery 
            bundles.Add(new ScriptBundle("~/plugins/switchery").Include(
                      "~/Scripts/plugins/switchery/switchery.js"));
        }
        //CssRewriteUrlTransform with virtual directory.
        //It’s true that CssRewriteUrlTransform will rewrite URLs to the Host, not to the Host/VirtualDir URI.
        //To do that, you have to derive CssRewriteUrlTransform to make it do what you need it to.
        //There is a good discussion here: ASP.NET MVC4 Bundling with Twitter Bootstrap
        //Seems the best answer is there: http://aspnetoptimization.codeplex.com/workitem/83
        //
        public class CssRewriteUrlTransformWrapper : IItemTransform
        {
            public string Process(string includedVirtualPath, string input)
            {
                return new CssRewriteUrlTransform().Process("~" + System.Web.VirtualPathUtility.ToAbsolute(includedVirtualPath), input);
            }
        }
    }
}
